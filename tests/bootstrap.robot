*** Settings ***
Resource  config.robot
Resource  keywords/utils.robot
Resource  keywords/login/keywords.robot
Resource  keywords/settings/keywords.robot
Resource  keywords/interface/keywords.robot
Resource  keywords/apidator/keywords.robot
Resource  keywords/trend/keywords.robot

*** Variables ***
${LOGIN URL}            ${BASE URL}/login
${VALID USERNAME}       admin
${VALID PASSWORD}       admin
${INVALID USERNAME}     marsupilami
${INVALID PASSWORD}     marsupilami

${TEST API NAME}                Test Api
${TEST API NAME COMBINED}       TestApi

${MODIFIED API NAME}            Modified Api
${MODIFIED API NAME COMBINED}   ModifiedApi

${TEST FIELD NAME}              Test Field
${TEST FIELD VALUE}             value