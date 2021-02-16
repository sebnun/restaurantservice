import { LightningElement, wire, track } from "lwc";
import getFieldManagerCaseList from "@salesforce/apex/CaseHelper.getFieldManagerCaseList";
import getUserList from "@salesforce/apex/UserHelper.getUserList";
import assignUser from "@salesforce/apex/UserHelper.assignUser";
import { refreshApex } from "@salesforce/apex";

const actions = [{ label: "Select user to Assign", name: "assign" }];

export default class CaseAssignmentTable extends LightningElement {
  caseColumns = [
    {
      label: "Case Number",
      fieldName: "CaseNumber",
      type: "text",
      sortable: true
    },
    {
      label: "Assignee",
      fieldName: "Assignee__c",
      type: "text",
      sortable: true
    },
    {
      label: "Assignment Status",
      fieldName: "Assignment_Status__c",
      type: "text",
      sortable: true
    },
    {
      type: "action",
      typeAttributes: { rowActions: actions }
    }
  ];

  @track error;
  @track caseList;

  @wire(getFieldManagerCaseList)
  wiredCases({ error, data }) {
    if (data) {
      this.caseList = data;
      console.log("wired case")
    } else if (error) {
      this.error = error;
    }
  }

  selectedCaseId = "";

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = JSON.parse(JSON.stringify(event.detail.row));
    switch (actionName) {
      case "assign":
        this.selectedCaseId = row.Id;
        this.openModal();
        break;
      default:
    }
  }

  // TODO: make new component and use composition
  /////////////////////////////////

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  assignUser() {
    this.isModalOpen = false;
    assignUser({ userId: this.selectedUserId, caseId: this.selectedCaseId });
    refreshApex(this.userList)
    refreshApex(this.caseList)
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
      console.log("wired user")
      this.userList = data;
    } else if (error) {
      this.error = error;
    }
  }
}
