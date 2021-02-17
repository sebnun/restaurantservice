trigger CaseTrigger on Case (before delete, before update) {

    List<User> usersToUpdate = new List<User>();
    List<Case> casesToUpdate = new List<Case>();

    // TODO: make helper class to handle logic

    switch on Trigger.operationType {
        when BEFORE_DELETE {
            for(Case acase : Trigger.Old) {
                User auser = [SELECT Is_Assigned__c FROM USER WHERE Id =: acase.Assignee__c ];
                
                if (auser.Is_Assigned__c != null) {
                    auser.Is_Assigned__c = null;
                    usersToUpdate.add(auser);
                }
            }
        }
        when BEFORE_UPDATE {
            for(Case acase : Trigger.New) {
                if (acase.Status == 'Closed') {
                    User auser = [SELECT Is_Assigned__c FROM USER WHERE Id =: acase.Assignee__c ];
                    
                    if (auser.Is_Assigned__c != null) {
                        auser.Is_Assigned__c = null;
                        usersToUpdate.add(auser);
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