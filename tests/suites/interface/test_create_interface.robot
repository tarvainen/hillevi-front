*** Settings ***
Resource        ../../bootstrap.robot

Suite Setup      Run Keywords     Open Browser To Login Page     Do Valid Login
Suite Teardown   Close Browser

*** Test Cases ***
Create Api And Delete It
    Go To Api Management
    Create New Api
    Wait Until Modals Are Closed
    Select Just Created Api
    Delete The Created Api
    Deleted Api Should Not Exist

Create New Api And Modify It And Then Delete It
    Go To Api Management
    Create New Api
    Wait Until Modals Are Closed
    Modify Api Basic Information
    Save Api From The Inspection Panel
    Api Should Be Updated
    Delete The Modified Api

Create New Api And Add Columns To It Then Delete The Api
    Go To Api Management
    Create New Api
    Wait Until Modals Are Closed
    Select Just Created Api
    Remove The Default Column From The Api
    Save Api From The Inspection Panel
    Add New Column To The New Api
    Save Api From The Inspection Panel
    Api Inspection Panel Should Be Open
    Delete The Created Api
    Deleted Api Should Not Exist

Try To Create Same Api Twice But Fail
    Go To Api Management
    Create New Api
    Wait Until Modals Are Closed
    Create New Api
    Error Text Should Be Shown
    Wait For It
    Dialog Should Be Open
    Close Creation Dialog
    Wait Until Modals Are Closed
    Select Just Created Api
    Delete The Created Api
    Deleted Api Should Not Exist