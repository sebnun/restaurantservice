public inherited sharing class UserHelper {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserList() {
        return [SELECT FirstName, LastName, Username, UserType FROM User WHERE Is_Assigned__c = False];
    }

    @AuraEnabled
    public static void assignUser(String userId, String caseId) {
        User user = [SELECT Is_Assigned__c FROM User WHERE Id =: userId];
        user.Is_Assigned__c = True;
        update user;

        Case assignedCase = [SELECT Assignee__c FROM Case WHERE Id =: caseId];
        assignedCase.Assignee__c = user.Id;
        assignedCase.Assignment_Status__c = 'Waiting for response';
        update assignedCase;
    }
}
