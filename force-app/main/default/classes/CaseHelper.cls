public inherited sharing class CaseHelper {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList() {
        return [SELECT Id, CaseNumber, Assignee__c, Assignment_Status__c FROM Case];
    }
}
