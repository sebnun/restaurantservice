public inherited sharing class CaseHelper {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList() {
        return [SELECT Id FROM Case];
    }
}
