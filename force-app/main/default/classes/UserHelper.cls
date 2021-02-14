public inherited sharing class UserHelper {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserList() {
        return [SELECT Id, Name FROM User];
    }
}
