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


### Danger zone keywords  ###

# Assertions
Danger Zone Should Be Disabled
    Wait Until Page Does Not Contain Element    form_user_credentials

Danger Zone Should Be Enabled
    Wait Until Page Contains Element            form_user_credentials

Api Token Should Not Be Visible
    Wait Until Page Does Not Contain Element    container_api_token

Api Token Should Be Visible
    Wait Until Page Contains Element            container_api_token

Password Saving Button Should Be Enabled
    Wait Until Element Is Enabled               btn_danger_zone_save

Password Saving Button Should Be Disabled
    Element Should Be Disabled                  btn_danger_zone_save

# Actions
Toggle Danger Zone
    Wait Until Page Contains Element    switch_enable_danger_zone
    Click Element                       switch_enable_danger_zone

Show Api Token
    Wait Until Page Contains Element    btn_show_api_token
    Click Element                       btn_show_api_token

Enter Wrong Old Password
    Wait Until Page Contains Element    user_settings_old_password
    Input Text                          user_settings_old_password          reallywrongoldpass

Enter Right Old Password
    Wait Until Page Contains Element    user_settings_old_password
    Input Text                          user_settings_old_password          ${VALID PASSWORD}

Enter New Password
    Wait Until Page Contains Element    user_settings_new_password
    Input Text                          user_settings_new_password          useradminnewpass

Enter New Password Again In The Right Way
    Wait Until Page Contains Element    user_settings_new_password_again
    Input Text                          user_settings_new_password_again    useradminnewpass

Enter New Password Again In The Wrong Way
    Wait Until Page Contains Element    user_settings_new_password_again
    Input Text                          user_settings_new_password_again    useradminnwpasstypodpass

Try To Save New Password
    Wait Until Page Contains Element    btn_danger_zone_save
    Click Element                       btn_danger_zone_save
    Wait For Loader

Clear Old Password
    Clear Element Text                  user_settings_old_password

Clear New Password
    Clear Element Text                  user_settings_new_password

Clear New Password Again
    Clear Element Text                  user_settings_new_password_again

Enter Modified Password
    Wait Until Page Contains Element    user_settings_old_password
    Input Text                          user_settings_old_password          useradminnewpass

Enter Reverted Password To The New Password Field
    Wait Until Page Contains Element    user_settings_new_password
    Input Text                          user_settings_new_password          admin

Enter Reverted Password To The New Password Field Again
    Wait Until Page Contains Element    user_settings_new_password_again
    Input Text                          user_settings_new_password_again    admin
