*** Settings ***
Resource  ../../bootstrap.robot

Suite Setup      Run Keywords     Open Browser To Login Page     Do Valid Login
Suite Teardown   Close Browser

*** Test Cases ***
Open Settings Tab
    Go To Settings Page

Modify Username
    Modify Username
    Save User Settings
    Modified Username Should Show In The Navbar

Revert Username
    Revert Username
    Save User Settings

Modify First Name
    Modify First Name
    Save User Settings

Modify Last Name
    Modify Last Name
    Save User Settings

Revert Names
    Revert First Name
    Revert Last Name
    Save User Settings

Modify Email
    Modify Email Address
    Save User Settings
    Modified Email Should Show In The Navbar

Revert Email
    Revert Email Address
    Save User Settings

Do It All Together
    Modify Username
    Modify First Name
    Modify Last Name
    Modify Email Address
    Save User Settings
    Modified Email Should Show In The Navbar
    Modified Username Should Show In The Navbar

Revert All
    Revert Username
    Revert First Name
    Revert Last Name
    Revert Email Address
    Save User Settings

