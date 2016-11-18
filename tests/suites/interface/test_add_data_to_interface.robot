*** Settings ***
Resource            ../../bootstrap.robot

Suite Setup         Run Keywords     Open Browser To Login Page     Do Valid Login
Suite Teardown      Close Browser

*** Keywords ***

Create Api
    Go To Api Management
    Create New Api
    Select Just Created Api
    Remove The Default Column From The Api
    Add New Column To The New Api

Add Data To The Api
    Go To The Api Data Management
    Select Test Api From The Api Dropdown

    : FOR    ${INDEX}    IN RANGE    1   10
        \    Open Api Data Row Input Dialog
        \    Input Data     ${INDEX}
        \    Save Api Data Row And Close Dialog

Delete Api
    Go To Api Management
    Select Just Created Api
    Delete The Created Api


*** Test Cases ***
Create Api And Add Data To It
    Create Api
    Add Data To The Api

See That The Api Exists In The Trend Chart Api List
    Go To The Trend Chart
    Wait For Loader
    Open The Api List
    Api List Should Contain The Test Column
    Select The Test Column From The Api List

Fetch Chart And Test That The Chart Exists
    Fetch Chart Data
    Chart Should Be Visible

Delete The Api After Modifying It
    Delete Api