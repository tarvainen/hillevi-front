*** Keywords ***
Go To Settings Page
    User Should Be Logged In
    Click Element                       btn_settings
    Settings Page Should Be Open

Settings Page Should Be Open
    Wait Until Page Contains Element    settings_ui_container

Modify First Name
    Wait Until Element Is Enabled       user_settings_firstname
    Input Text                          user_settings_firstname       Aarne

Modify Last Name
    Wait Until Element Is Enabled       user_settings_lastname
    Input Text                          user_settings_lastname        Administrator

Modify Email Address
    Wait Until Element Is Enabled       user_settings_email
    Input Text                          user_settings_email           robot@hillevi.xyz

Revert Email Address
    Wait Until Element Is Enabled       user_settings_email
    Clear Element Text                  user_settings_email

Revert First Name
    Wait Until Element Is Enabled       user_settings_firstname
    Input Text                          user_settings_firstname       Administrator

Revert Last Name
    Wait Until Element Is Enabled       user_settings_lastname
    Input Text                          user_settings_lastname        Admin

Modify Username
    Wait Until Element Is Enabled       user_settings_username
    Input Text                          user_settings_username        admin_modified

Revert Username
    Wait Until Element Is Enabled       user_settings_username
    Input Text                          user_settings_username        admin

Modified Username Should Show In The Navbar
    Wait Until Element Contains         user_info_username            admin_modified

Modified Email Should Show In The Navbar
    Wait Until Element Contains         user_info_email               robot@hillevi.xyz

Save User Settings
    Wait Until Element Is Enabled       btn_user_settings_save
    Click Element                       btn_user_settings_save
    Wait Until Page Contains Element    tag=md-toast
