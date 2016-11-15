*** Settings ***
Resource        ../../bootstrap.robot

Suite Setup     Open Browser To Login Page
Suite Teardown  Close Browser

*** Test Cases ***
Valid Login
    Do Valid Login

Valid Logout
    Do Valid Logout