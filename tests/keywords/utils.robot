*** Keywords ***

# Timing
Wait For It
    Sleep   1 seconds

Wait For Loader
    Wait Until Page Does Not Contain Element    tag=loader

Wait Until Modals Are Closed
    Wait Until Page Does Not Contain Element    css=div.md-dialog-container


# Assertions
Error Text Should Be Shown
    Wait Until Page Contains Element    tag=md-toast

Dialog Should Be Open
    Wait Until Page Contains Element    css=div.md-dialog-container