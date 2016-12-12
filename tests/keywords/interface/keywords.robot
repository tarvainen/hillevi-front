*** Keywords ***

# Navigation
Go To Api Management
    Wait Until Page Contains Element    link_api_management
    Click Element                       link_api_management
    Api Management Should Be Open


# Assertions
Api Inspection Panel Should Be Open
    Wait Until Element Is Visible       api_inspection_panel

Api Inspection Panel Should Not Be Open
    Wait Until Element Is Not Visible   api_inspection_panel

Api Management Should Be Open
    Wait Until Page Contains Element    api_management_container
    Wait For Loader

New Api Creation Dialog Should Be Open
    Wait Until Page Contains Element    dialog_new_api_creation

Api Should Be Updated
    Wait Until Page Contains Element    tr_api_ModifiedApi

New Api Field Row Should Be Added
    Wait Until Page Contains Element    css=tr.api-col-row

Deleted Api Should Not Exist
    Wait Until Page Does Not Contain Element    tr_api_TestApi


# New api creation keywords
Press Create New Api Button
    Wait Until Page Contains Element    btn_create_new_api
    Click Element                       btn_create_new_api

Enter New Api Information
    Wait For Loader
    Input Text                          input_create_new_api_name           ${TEST API NAME}
    Input Text                          input_create_new_api_url            http://localhost:8000/api/test/json
    Click Element                       input_create_new_api_type

    Wait Until Element Is Visible       option_json
    Click Element                       option_json

    Wait Until Element Is Enabled       input_create_new_api_interval
    Input Text                          input_create_new_api_interval       200

Save Api
    Click Element                       btn_save_new_api
    Wait For Loader

Select Just Created Api
    Wait Until Page Contains Element    tr_api_${TEST API NAME COMBINED}
    Click Element                       tr_api_${TEST API NAME COMBINED}
    Api Inspection Panel Should Be Open

Press Delete Button
    Wait Until Element Is Enabled       btn_delete_api
    Click Element                       btn_delete_api

Confirm Removal Operation
    Wait Until Element Is Visible       css=button.md-confirm-button
    Click Element                       css=button.md-confirm-button
    Wait For Loader
    Api Inspection Panel Should Not Be Open

Create New Api
    Press Create New Api Button
    New Api Creation Dialog Should Be Open
    Enter New Api Information
    Save Api

Delete The Created Api
    Press Delete Button
    Confirm Removal Operation

Modify Api Basic Information
    Select Just Created Api
    Input Text                          input_api_update_name           ${MODIFIED API NAME}
    Input Text                          input_api_update_url            http://localhost:7000/modified/api
    Input Text                          input_api_update_interval       459

Save Api From The Inspection Panel
    Click Element                       btn_api_update_save
    Wait For Loader

Select Modified Api
    Wait Until Page Contains Element    tr_api_${MODIFIED API NAME COMBINED}
    Click Element                       tr_api_${MODIFIED API NAME COMBINED}
    Api Inspection Panel Should Be Open

Delete The Modified Api
    Select Modified Api
    Press Delete Button
    Confirm Removal Operation

Close Creation Dialog
    Wait Until Page Contains Element    btn_cancel_api_creation
    Click Element                       btn_cancel_api_creation

# Api columns
Remove The Default Column From The Api
    Wait Until Page Contains Element    css=tr#api_col_value > td > md-checkbox
    Wait For It
    Click Element                       css=tr#api_col_value > td > md-checkbox
    Click Element                       btn_delete_api_columns

Add New Column To The New Api
    Click Element                       btn_add_api_column
    New Api Field Row Should Be Added
    Input Text                          css=tr.api-col-row .input-column-field-name      ${TEST FIELD NAME}
    Input Text                          css=tr.api-col-row .input-column-field-value     ${TEST FIELD VALUE}

    Click Element                       css=tr.api-col-row .select-api-col-type
    Wait Until Element Is Visible       css=md-option.api-col-type-int
    Click Element                       css=md-option.api-col-type-int

    Click Element                       css=tr.api-col-row .select-api-col-aggregate
    Wait Until Element Is Visible       css=md-option.api-col-aggregate_sum
    Click Element                       css=md-option.api-col-aggregate_sum

