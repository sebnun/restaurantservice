public inherited sharing class CaseHelper {

    @AuraEnabled(cacheable=true)
    public static List<Case> getFieldManagerCaseList() {
        return [SELECT Id, CaseNumber, Assignee__c, Assignment_Status__c FROM Case];
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getServicePersonCaseList() {
        //return [SELECT Id, CaseNumber, Assignment_Status__c FROM Case WHERE Assignee__c =: UserInfo.getUserId() ];
        return [SELECT Id, CaseNumber, Assignment_Status__c FROM Case ];
    }

    @AuraEnabled
    public static void rejectCase(String caseId) {
        Case assignedCase = [SELECT Assignment_Status__c FROM Case WHERE Id =: caseId];
        assignedCase.Assignment_Status__c = 'Rejected';

        update assignedCase;
    }

    @AuraEnabled
    public static void acceptCase(String caseId) {
        Case assignedCase = [SELECT Assignment_Status__c FROM Case WHERE Id =: caseId];
        assignedCase.Assignment_Status__c = 'Accepted';

        update assignedCase;
    }
}
