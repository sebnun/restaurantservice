public inherited sharing class UserHelper {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserList() {
        return [SELECT FirstName, LastName, Username, UserType FROM User WHERE Is_Assigned__c = False];
    }
}
