*** Settings ***
Resource        ../../bootstrap.robot

Suite Setup      Open Browser To Login Page
Suite Teardown   Close Browser

*** Test Cases ***
Invalid Login
    Enter Invalid Login Credentials
    Press Login Button
    Error Text Should Be Shown