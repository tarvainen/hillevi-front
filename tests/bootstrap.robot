*** Settings ***
Resource  config.robot
Resource  keywords/utils.robot
Resource  keywords/login/keywords.robot
Resource  keywords/settings/keywords.robot

*** Variables ***
${LOGIN URL}            ${BASE URL}/login
${VALID USERNAME}       admin
${VALID PASSWORD}       admin
${INVALID USERNAME}     marsupilami
${INVALID PASSWORD}     marsupilami
