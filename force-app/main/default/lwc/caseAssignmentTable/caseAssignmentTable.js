import { LightningElement, wire, track } from "lwc";
import getCaseList from "@salesforce/apex/CaseHelper.getCaseList";
import getUserList from "@salesforce/apex/UserHelper.getUserList";

const actions = [{ label: "Select user to Assign", name: "assign" }];

export default class CaseAssignmentTable extends LightningElement {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  assignUser() {
    this.isModalOpen = false;

    // TODO
  }

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

  @wire(getCaseList)
  wiredCases({ error, data }) {
    if (data) {
      this.caseList = data;
    } else if (error) {
      this.error = error;
    }
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "assign":
        this.openModal();
        break;
      default:
    }
  }

  @track userList;

  @wire(getUserList)
  wiredUsers({ error, data }) {
    if (data) {
      this.userList = data;
    } else if (error) {
      this.error = error;
    }
  }

}
