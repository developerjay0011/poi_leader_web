export const getRejectedFieldsObject = (rejectedArray: any) => {
    const rejectedFieldsObject = {} as any
    if (Array.isArray(rejectedArray) && rejectedArray?.length > 0) {
        rejectedArray.forEach(rejectedField => {
            if (rejectedField.field_name === "activity_pictures") {
                rejectedFieldsObject['done_any_political_activity'] = null
            } else if (rejectedField.field_name === "referencies") {
                rejectedFieldsObject['referencies'] = null
            } else if (rejectedField.field_name === "ministries") {
                rejectedFieldsObject['is_hold_ministry'] = null
            } else {
                rejectedFieldsObject[rejectedField.field_name] = null
            }
        });
    }
    return rejectedFieldsObject;
};