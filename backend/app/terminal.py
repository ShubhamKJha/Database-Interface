__author__ = "ShubhamKJha<skjha832@gmail.com>"

import ast
import logging
import types
import pickle
import sys
import traceback
import tokenize

from io import StringIO, BytesIO

from .models import Picklables, UnPicklables, UnPicklableNames, History
from . import db

from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity


# These types can't be pickled
# Hence, the commands needs to
# be executed to push them into
# global namespace
UNPICKLABLE_TYPES = (
  types.ModuleType,
  type,
  types.FunctionType,
)


def clear_data():
    user_id = get_jwt_identity()['id']
    Picklables.query.filter_by(user_id=user_id).delete()
    UnPicklables.query.filter_by(user_id=user_id).delete()
    UnPicklableNames.query.filter_by(user_id=user_id).delete()
    History.query.filter_by(user_id=user_id).delete()


# Add magic key-words here and their
# corresponding actions
MAGICS = {
    '%clear%': clear_data,
}


# Handling the current State Variables
def fast_dumps(obj, protocol=3):
    file = BytesIO()
    p = pickle.Pickler(file, protocol)
    p.fast = 1
    p.dump(obj)
    return file.getvalue()


def set_global(name, value, commit=True):
    blob = fast_dumps(value)
    user_id = get_jwt_identity()['id']

    picklable = Picklables.query.filter_by(global_name=name).filter_by(user_id=user_id).first()

    if picklable is not None:
        picklable.global_ = blob
    else:
        picklable = Picklables(user_id=user_id,global_name=name, global_=blob)
        db.session.add(picklable)

    remove_unpicklable_name(name, False)

    if commit:
        db.session.commit()


def remove_global(name, commit=True):
    user_id = get_jwt_identity()['id']
    picklable = Picklables.query.filter_by(global_name=name).filter_by(user_id=user_id).first()

    if picklable is not None:
        db.session.delete(picklable)

    if commit:
        db.session.commit()


def globals_dict():
    user_id = get_jwt_identity()['id']
    return dict((picklable.global_name, pickle.loads(picklable.global_)) for picklable in
                Picklables.query.filter_by(user_id=user_id).all())


def get_unpicklables():
    user_id = get_jwt_identity()['id']
    return [unpicklable.unpicklable for unpicklable in UnPicklables.query.filter_by(user_id=user_id).all()]


def add_unpicklable(statement, names, commit=True):
    user_id = get_jwt_identity()['id']
    unpicklable = UnPicklables(user_id=user_id,unpicklable=statement)
    db.session.add(unpicklable)

    for name in names:
        remove_global(name, False)
        if UnPicklableNames.query.filter_by(user_id=user_id).filter_by(unpicklable_name =name).first() is None:
            db.session.add(UnPicklableNames(user_id=user_id,unpicklable_name=name))

    if commit:
        db.session.commit()


def remove_unpicklable_name(name, commit=True):
    user_id = get_jwt_identity()['id']
    unpicklable_name = UnPicklableNames.query.filter_by(unpicklable_name=name).filter_by(user_id=user_id).first()
    if unpicklable_name is not None:
        db.session.delete(unpicklable_name)

    if commit:
        db.session.commit()


# The shell
class Shell:
    _header = 'Traceback (most recent call last):\n'
    _file = '<string>'

    def traceback(self, offset=None):

        etype, value, tb = sys.exc_info()

        if tb.tb_next is not None:
            _tb = tb.tb_next
        else:
            _tb = tb

        try:
            if offset is not None:
                lines = traceback.extract_tb(_tb)

                line = lines[0][1] + offset
                lines[0] = (lines[0][0], line) + lines[0][2:]

                text = [self._header]
                text = text + traceback.format_list(lines)
                text = text + traceback.format_exception_only(etype, value)

                line = lines[0][1]
            else:
                text = traceback.format_exception(etype, value, _tb)
                line = _tb.tb_lineno
        finally:
            del tb, _tb

        return ''.join(text), line

    def syntaxerror(self):
        etype, value, sys.last_traceback = sys.exc_info()

        line = None
        sys.last_type = etype
        sys.last_value = value

        try:
            msg, (dummy_filename, line, offset, source) = value

        except:
            pass

        else:
            value = etype(msg, (self._file, line, offset, source))
            sys.last_value = value

        text = [self._header]
        text = text + traceback.format_exception_only(etype, value)

        return ''.join(text), line

    def error(self, stream, errorval):
        if stream is not None:
            stream.write(errorval[0])

    def split(self, source):
        try:
            print("sourceis : ", BytesIO(source.encode()).readline, "-> ",tokenize.tokenize(BytesIO(source.encode()).readline))
            tokens = list(tokenize.tokenize(BytesIO(source.encode()).readline))
        except (OverflowError, SyntaxError, ValueError, tokenize.TokenError):
            return None, source
        for tok, _, (n, _), _, _ in reversed(tokens):
            if tok == tokenize.NEWLINE:
                lines = source.split('\n')

                exec_source = '\n'.join(lines[:n])
                eval_source = '\n'.join(lines[n:])

                return exec_source, eval_source

        else:
            return None, source

    def compile(self, source, mode):

        return compile(source, self._file, mode)

    # Todo: Add auto-complete feature

    # main feature, evaluate statement

    def evaluate(self, statement, stream=None, displayhook=None):

        source = statement.replace('\r\n', '\n').rstrip()

        if '\n' not in source:
            source = source.lstrip()

        # Check for magic keywords
        if source in MAGICS:
            MAGICS[source]()

            return

        try:
            ast.parse(source)
        except SyntaxError:
            return self.error(stream, self.syntaxerror())

        exec_source, eval_source = self.split(source)

        try:
            self.compile(eval_source, 'eval')
        except (OverflowError, SyntaxError, ValueError):
            exec_source, eval_source = source, None

        if exec_source is not None:
            exec_source += '\n'
        if eval_source is not None:
            eval_source += '\n'

        statement_module = types.ModuleType('__main__')

        import builtins
        statement_module.__builtin__ = builtins.__dict__

        old_displayhook = sys.displayhook
        if displayhook:
            sys.displayhook = displayhook

        old_main = sys.modules.get('__main__')

        try:
            old_globals = {}
            sys.modules['__main__'] = statement_module
            statement_module.__name__ = '__main__'

            for code in get_unpicklables():
                exec(code, statement_module.__dict__)
                exec(code, old_globals)

            session_globals_dict = globals_dict()

            for name, val in session_globals_dict.items():
                try:
                    statement_module.__dict__[name] = val
                    old_globals[name] = val
                except:
                    remove_global(name)

            builtins._ = session_globals_dict.get('_')

            offset = 0

            try:
                old_stdout = sys.stdout
                old_stderr = sys.stderr

                try:
                    if stream is not None:
                        sys.stdout = stream
                        sys.stderr = stream

                    if exec_source is not None:
                        try:
                            exec_code = self.compile(exec_source, 'exec')
                        except (OverflowError, SyntaxError, ValueError):
                            return self.error(stream, self.syntaxerror())

                        eval(exec_code, statement_module.__dict__)

                    if eval_source is not None:
                        if exec_source is not None:
                            offset = len(exec_source.split('\n'))

                        result = eval(eval_source, statement_module.__dict__)
                        sys.displayhook(result)
                finally:
                    sys.stdout = old_stdout
                    sys.stderr = old_stderr
            except Exception:
                return self.error(stream, self.traceback(offset))

            new_globals = {}

            for name, val in statement_module.__dict__.items():
                if name not in old_globals or val != old_globals[name]:
                    new_globals[name] = val

            for name in old_globals:
                if name not in statement_module.__dict__:
                    remove_global(name)

            if True in [isinstance(val, UNPICKLABLE_TYPES) for val in new_globals.values()]:
                # this statement added an unpicklable global. store the statement and
                # the names of all of the globals it added in the unpicklables
                source = ""

                if exec_source:
                    source += exec_source
                if eval_source:
                    source += eval_source

                source += "\n"

                add_unpicklable(source, new_globals.keys())
                logging.debug('Storing this statement as an unpicklable.')
            else:
                # this statement didn't add any unpicklables. pickle and store the
                # new globals back into the datastore
                for name, val in new_globals.items():
                    if not name.startswith('__'):
                        try:
                            set_global(name, val)
                        except (TypeError, pickle.PicklingError):
                            pass

            # save '_' special variable into the datastore
            val = getattr(builtins, '_', None)

            try:
                set_global('_', val)
            except (TypeError, pickle.PicklingError):
                set_global('_', None)
        finally:
            sys.modules['__main__'] = old_main
            sys.displayhook = old_displayhook

            try:
                del builtins._
            except AttributeError:
                pass
