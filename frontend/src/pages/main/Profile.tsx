import React from "react";
import { Header } from "../../components/Header";
import { GradientLine } from "../../components/GradientLine";
import { Footer } from "../../components/Footer";
import styles from "./Profile.module.css";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

class Profile extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <GradientLine />
        <div className={styles.profile}>
          <div className={styles.side1}>
            <Card className={styles.profile_pic}>
              <img
                className={styles.media}
                src="../../profile.png"
                alt="profile"
              />
              <CardContent className={styles.profile_pic}>
                <Typography gutterBottom variant="h5" component="h2">
                  Name
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  I am Database enthusiast.
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className={styles.side2}>
            <div className="profile-data">
              <List>
                <ListItem>
                  <label>Name: Name</label>
                </ListItem>
                <ListItem>
                  <label>Email: My.name@email.com</label>
                </ListItem>
                <ListItem>
                  <label>User Name: MyUsername</label>
                </ListItem>
                <ListItem>
                  <label>Password: ********</label>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
