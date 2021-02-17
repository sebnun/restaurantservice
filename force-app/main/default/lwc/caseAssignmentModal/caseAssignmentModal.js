import { LightningElement, track, wire, api } from 'lwc';
import getUserList from "@salesforce/apex/UserHelper.getUserList";
import assignUser from "@salesforce/apex/UserHelper.assignUser";

export default class CaseAssignmentModal extends LightningElement {

    @api selectedcaseid;
  
    assignUserHandler() {
      assignUser({ userId: this.selectedUserId, caseId: this.selectedcaseid })
      this.closeModal()
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent("modalclose"))
    }
  
    @track userList;
  
    userColumns = [
      {
        label: "First name",
        fieldName: "FirstName",
        type: "text",
        sortable: true
      },
      {
        label: "Last name",
        fieldName: "LastName",
        type: "text",
        sortable: true
      },
      {
        label: "User name",
        fieldName: "Username",
        type: "text",
        sortable: true
      },
      {
        label: "User type",
        fieldName: "UserType",
        type: "text",
        sortable: true
      }
    ];
  
    selectedUserId = "";
  
    getSelection(event) {
      const selectedRows = event.detail.selectedRows;
      for (let i = 0; i < selectedRows.length; i++) {
        this.selectedUserId = selectedRows[i].Id;
      }
    }
  
    @wire(getUserList)
    wiredUsers({ error, data }) {
      if (data) {
        this.userList = data;
      } else if (error) {
        this.error = error;
      }
    }
}