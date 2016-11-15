*** Settings ***
Resource  bootstrap.robot

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Login Page Should Be Open
    Enter Valid Login Credentials
    Press Login Button
