*** Keywords ***

# Assertions
Api List Should Contain The Test Column
    Wait Until Element Is Visible           option_api_column_${TEST FIELD VALUE}

Chart Should Be Visible
    Wait Until Element Is Visible           canvas_graph_interface_main

# Navigation
Go To The Trend Chart
    Go To           ${BASE URL}/graph
    Wait For Loader

# Actions
Open The Api List
    Wait Until Element Is Visible           input_graph_selected_columns
    Click Element                           input_graph_selected_columns
    Wait For It

Select The Test Column From The Api List
    Click Element                           option_api_column_${TEST FIELD VALUE}
    Click Element                           tag=md-backdrop

Fetch Chart Data
    Wait Until Element Is Visible           btn_fetch_chart_data
    Click Element                           btn_fetch_chart_data
