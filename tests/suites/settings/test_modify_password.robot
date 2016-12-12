*** Settings ***
Resource  ../../bootstrap.robot

Suite Setup      Run Keywords     Open Browser To Login Page     Do Valid Login
Suite Teardown   Close Browser

*** Test Cases ***
The Password Field Disables Itself When We Leave The Settings Page
    Go To Settings Page
    Toggle Danger Zone
    Danger Zone Should Be Enabled
    Go To The Dashboard
    Wait For It
    Go To Settings Page
    Danger Zone Should Be Disabled
    Toggle Danger Zone
    Danger Zone Should Be Enabled
    Toggle Danger Zone
    Danger Zone Should Be Disabled
    Toggle Danger Zone
    Danger Zone Should Be Enabled
    Go To The Dashboard
    Wait For It
    Go To Settings Page
    Danger Zone Should Be Disabled
    Go To The Dashboard

The Api Token Is Not Shown Before We Press The Show Button
    Go To Settings Page
    Toggle Danger Zone
    Api Token Should Not Be Visible
    Show Api Token
    Api Token Should Be Visible
    Toggle Danger Zone
    Api Token Should Not Be Visible
    Go To The Dashboard

The Api Token Is Disappeared In Five Seconds
    Go To Settings Page
    Toggle Danger Zone
    Api Token Should Not Be Visible
    Show Api Token
    Api Token Should Be Visible
    Sleep       6 seconds
    Api Token Should Not Be Visible
    Go To The Dashboard

Password Save Fails On Wrong Old Password
    Go To Settings Page
    Toggle Danger Zone
    Enter Wrong Old Password
    Enter New Password
    Enter New Password Again In The Right Way
    Try To Save New Password
    Error Text Should Be Shown
    Wait For It
    Password Saving Button Should Be Enabled
    Go To The Dashboard

Password Saving Fails On Mismatching New Passwords
    Go To Settings Page
    Toggle Danger Zone
    Enter Right Old Password
    Enter New Password
    Enter New Password Again In The Wrong Way
    Try To Save New Password
    Error Text Should Be Shown
    Wait For It
    Password Saving Button Should Be Enabled
    Go To The Dashboard

Password Saving Option Should Be Disabled When Input Is Empty
    Go To Settings Page
    Toggle Danger Zone
    Password Saving Button Should Be Disabled
    Go To The Dashboard

Password Saving Option Should Be Disabled When One Of The Inputs Is Empty
    Go To Settings Page
    Toggle Danger Zone
    Password Saving Button Should Be Disabled
    Enter New Password
    Password Saving Button Should Be Disabled
    Clear New Password
    Enter New Password Again In The Wrong Way
    Password Saving Button Should Be Disabled
    Enter New Password
    Password Saving Button Should Be Disabled
    Clear New Password
    Enter Right Old Password
    Password Saving Button Should Be Disabled
    Enter New Password
    Password Saving Button Should Be Enabled
    Clear New Password Again
    Password Saving Button Should Be Disabled
    Enter New Password Again In The Wrong Way
    Password Saving Button Should Be Enabled
    Clear Old Password
    Go To The Dashboard

Password Saving Should Work On Right Input
    Go To Settings Page
    Toggle Danger Zone
    Enter Right Old Password
    Enter New Password
    Enter New Password Again In The Right Way
    Try To Save New Password
    Wait For Loader
    Password Saving Button Should Be Disabled
    Go To The Dashboard

New Password Should Be Working Right Now
    Go To Settings Page
    Toggle Danger Zone
    Enter Modified Password
    Enter Reverted Password To The New Password Field
    Enter Reverted Password To The New Password Field Again
    Try To Save New Password
    Wait For Loader
    Password Saving Button Should Be Disabled
    Go To The Dashboard