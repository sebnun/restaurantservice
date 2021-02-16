trigger CaseTrigger on Case (before delete, before update) {

    List<User> usersToUpdate = new List<User>();
    List<Case> casesToUpdate = new List<Case>();

    switch on Trigger.operationType {
        when BEFORE_DELETE {
            for(Case acase : Trigger.New) {
                User user = [SELECT Is_Assigned__c FROM USER WHERE Id =: acase.Assignee__c ];
                
                if (user.Is_Assigned__c != null) {
                    user.Is_Assigned__c = null;
                    usersToUpdate.add(user);
                }
            }
        }
        when BEFORE_UPDATE {
            for(Case acase : Trigger.New) {
                if ( acase.Status == 'Closed') {
                    User user = [SELECT Is_Assigned__c FROM USER WHERE Id =: acase.Assignee__c ];
                    
                    if (user.Is_Assigned__c != null) {
                        user.Is_Assigned__c = null;
                        usersToUpdate.add(user);
                    }

                    acase.Assignee__c = null;
                    casesToUpdate.add(acase);
                }
            }
        } 
    }

    update usersToUpdate;
    update casesToUpdate;
}