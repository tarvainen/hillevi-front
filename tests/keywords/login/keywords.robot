*** Keywords ***
Open Browser To Login Page
    Open Browser        ${LOGIN URL}        ${BROWSER}
    Set Window Size     ${WINDOW WIDTH}     ${WINDOW HEIGHT}

Login Page Should Be Open
    Wait Until Page Contains Element   login_page_title

Enter Valid Login Credentials
    Input Text      login_input_username     ${VALID USERNAME}
    Input Password  login_input_password     ${VALID PASSWORD}

Enter Invalid Login Credentials
    Input Text      login_input_username     ${INVALID USERNAME}
    Input Password  login_input_password     ${INVALID PASSWORD}

Press Login Button
    Wait For It
    Click Button    login_btn_login

User Should Be Logged In
    Wait Until Page Contains Element    btn_logout

Press Logout Button
    Click Button    btn_logout

Do Valid Login
    Login Page Should Be Open
    Enter Valid Login Credentials
    Press Login Button
    User Should Be Logged In

Do Valid Logout
    User Should Be Logged In
    Press Logout Button
    Login Page Should Be Open