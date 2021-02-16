import { LightningElement, track, wire } from 'lwc';
import getServicePersonCaseList from "@salesforce/apex/CaseHelper.getServicePersonCaseList";
import acceptCase from "@salesforce/apex/CaseHelper.acceptCase";
import rejectCase from "@salesforce/apex/CaseHelper.rejectCase";

const actions = [{ label: "Accept", name: "accept" }, { label: "Reject", name: "reject" }];

export default class CaseAcknowledgmentTable extends LightningElement {
  caseColumns = [
    {
      label: "Case Number",
      fieldName: "CaseNumber",
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

  @wire(getServicePersonCaseList)
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
    this.selectedCaseId = row.Id;
    switch (actionName) {
      case "accept":
        acceptCase({ caseId: this.selectedCaseId })
        break;
    case "reject":
        rejectCase({ caseId: this.selectedCaseId })
        break;
      default:
    }
  }
}
