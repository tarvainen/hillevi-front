*** Keywords ***
Go To The Api Data Management
    Go To                                   ${BASE URL}/apidator
    Wait Until Page Contains Element        api_data_management_container
    Wait For Loader

Select Test Api From The Api Dropdown
    Wait Until Page Contains Element        select_interface_selection
    Click Element                           select_interface_selection
    Wait Until Element Is Visible           option_interface_${TEST API NAME COMBINED}
    Click Element                           option_interface_${TEST API NAME COMBINED}
    Wait For Loader

Open Api Data Row Input Dialog
    Wait Until Page Contains Element        btn_add_api_data_row
    Click Element                           btn_add_api_data_row

Input Data
    [Arguments]     ${val}
    Wait Until Element Is Visible           input_interface_data_${TEST FIELD VALUE}
    Input Text                              input_interface_data_${TEST FIELD VALUE}       ${val}

Save Api Data Row And Close Dialog
    Wait Until Element Is Visible           btn_dialog_save
    Click Element                           btn_dialog_save
    Wait Until Modals Are Closed
    Wait For Loader