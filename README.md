# Restaurant Equipment Maintenance (REM)

## Local setup

1. Authorize your dev hub, if not done already `sfdx auth:web:login -d -a myhuborg`

2. Clone this repo

3. Create a scratch org
`sfdx force:org:create -s -f config/project-scratch-def.json -a restaurantservice`

4. Push the code to your org
`sfdx force:source:push`

5. Open the org
`sfdx force:org:open`

## Use cases

* Back-office personnel
  * ✅ All must be able to maintain a database of customers and their contacts.
  * ✅ A user must be able to maintain the restaurants (name, location, etc. information) of customers
  * ✅ must be able to maintain the list of equipment in restaurants
  * must be able to manage the Service personnel users in Salesforce

* Field Service Managers
  * must be able to manage the Service personnel users in Salesforce
  * ✅ must be able to manage cases (questions about equipment, requests for fixing the equipment, other incidents) from restaurants
  * ✅ must be able to send a Service Person to fix an equipment related to a case
  * ✅ need to be able to see which persons are free when allocating a Service Person for an incident.
  * ✅ need to be able to see which visits have been accepted / rejected.

* Service Persons
  * ✅ need to be able to see the visits they have coming, and they need to be able to accept / reject the visits that have been planned to them.
  * need to be able to get a notification about new visits that have been planned for them
  * (at client location) need to be able to mark the incident complete, or as requiring further assistance (e.g. spare parts needed).
  * need to be able to add comments to the incident. 
  
* General
  * Customers can have different service levels that determine the urgency of the cases of the customer 

## Objects overview

![Objects](/objects.png)

### Standard objects, custom fields

* Account
* Contact
* Case
  * Assignee: Lookup(User)
  * Assignment Status: Picklist
* User
  * Is Assigned: Checkbox
  
### Custom objects

* Restaurant
  * Account: Master-Detail(Account)
  * Address: Text(100)
  * Restaurant Name: Text(80)
* Equipment
  * Equipment Name: Text(80)
  * Restaurant: Master-Detail(Restaurant)
  
## General notes

This application is incomplete, there are many improvements to be made, some of them are:

* Add tests, with the test coverage required
* Improve usability for the user, follow the Lightning Desgin System properly
* Improve code quality
* Add proper security to objects, profiles, etc. 
* Some of the functionalities could have been made with no-code tools, explore those options
* Add all missing functionality

  
