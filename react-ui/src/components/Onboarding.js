import ReactJoyride from "react-joyride";
import React, { useState } from "react";

const Onboarding = () => {
  const [joyride, setJoyride] = useState({
    run: false,
    steps: [
      {
        title: "Welcome to Elemental Health!",
        target: "#welcomeName",
        content: (
          <div>
            <h4>Get started recording your daily health</h4>
          </div>
        ),
        disableBeacon: true,
      },
      {
        title: "Add your Information",
        target: "#addButtons",
        content:
          "Get started by adding your doctors, conditions, and medications.",
      },
      {
        title: "Your Daily Checkin",
        target: "#dailyCheckinHomePage",
        content: "Fill out your daily check-in here each day.",
      },
      {
        title: "Home",
        target: ".mainHomepageArea",
        content:
          "As you add more information, your homepage will help you visualize your health over time.",
      },
      {
        title: "See your Medical Info",
        target: ".MyMedicalInfo",
        content:
          "See all your info here: your doctors & appointments, you medications, and your conditions.",
      },
      {
        title: "Your Profile",
        target: ".navProfile",
        content:
          "View your profile to change your account info, add a summary of your health, & see your uploaded insurance card.",
      },
      {
        title: "Logout",
        target: ".navLogout",
        content: "Log out from here if you need to.",
      },
    ],
  });
  return (
    <React.Fragment>
      <div>
        <button
          onClick={() => {
            setJoyride({ ...joyride, run: !joyride.run });
          }}
          style={{
            backgroundColor: "#ff0044",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Take The Tour
        </button>
      </div>
      <ReactJoyride
        steps={joyride.steps}
        run={joyride.run}
        continuous
        showProgress
        showSkipButton
      />
    </React.Fragment>
  );
};

export default Onboarding;
