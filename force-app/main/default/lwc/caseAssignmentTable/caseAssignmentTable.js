import { LightningElement, wire, track } from "lwc";
import getFieldManagerCaseList from "@salesforce/apex/CaseHelper.getFieldManagerCaseList";

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

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }

  @track error;
  @track caseList;

  @wire(getFieldManagerCaseList)
  wiredCases({ error, data }) {
    if (data) {
      this.caseList = data;
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
}
