import ReactJoyride from 'react-joyride';
import React, { useState } from 'react'
//step 1: add buttons (class: addButtons)
//step 2: fill out your daily checkin for the day (class: dailyCheckinHomePage)
//step 3: as you fill out things, you'll start to see more of your data populating on the homepage and across your pages (NEED TO MAKE THIS)
//step 4: nav bar 1 -- see all your medical info (class: .MyMedicalInfo)
//step 5: another way to access the daily check in (class:.navDailyCheckin)
//step 6: view your profile to change your info, add a summary of your health, see your uploaded insurance card (class: navProfile)
//step 7: logout if you need to (class: navLogout)



const Onboarding = () => {
    const [joyride, setJoyride] = useState({
        run: false,
        steps: [
            {
                title: 'Welcome to Elemental Health!',
                target: ".welcomeName",
                content: <div><h4>Get started recording your daily health</h4></div>,
                disableBeacon: true
            },
            {
                title: "Add your Information",
                target: "#addButtons",
                content: 'Get started by adding your doctors, conditions, and medications.'
            },
            {
                title: "Your Daily Checkin",
                target: '#dailyCheckinHomePage',
                content: 'Fill out your daily checkin here each day.'
            },
            {
                title: "Home",
                target: '.mainHomepageArea',
                content: "As you add more information, your homepage will help you visualize your health over time."
            },
            {
                title: 'See your Medical Info',
                target: '.MyMedicalInfo',
                content: 'See all your info here: your doctors & appointments, you medications, and your conditions.'
            },
            {
                title: 'Daily Checkin',
                target: '.navDailyCheckin',
                content: 'Here is another way to access your daily check in. Make sure to fill it out each day!'
            },
            {
                title: 'Your Profile',
                target: '.navProfile',
                content: "View your profile to change your account info, add a summary of your health, & see your uploaded insurance card."
            },
            {
                title: 'Logout',
                target: '.navLogout',
                content: 'Log out from here if you need to.'
            }
        ]
    })
    return (
        <React.Fragment>
            <div style={{ marginLeft: "10%", marginRight: "auto" }}>
                <button
                    onClick={() => { setJoyride({ ...joyride, run: !joyride.run }); }}
                    style={{ backgroundColor: "#ff0044", color: "white", border: "none", fontSize: "18px", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Take The Tour</button>
            </div>
            <ReactJoyride
                steps={joyride.steps}
                run={joyride.run}
                continuous
                showProgress
                showSkipButton />
        </React.Fragment>

    )

}

export default Onboarding