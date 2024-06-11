import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';


interface ExpenseFormValue {
  type: "income" | "expense";
  amount: number | null;
  reason: string | null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'expense';
  incomeExpenseList: ExpenseFormValue[] = [];
  incomeAmount: number = 0;
  expenseAmount: number = 0;
  totalSavings: number = 0;
  #fb = inject(FormBuilder);


  ngOnInit(): void {
    this.expenseForm.get("transactionTable")?.valueChanges.subscribe((val) => console.log(val));
  }
  // Form Data
  expenseForm = this.#fb.group({
    type: ["", Validators.required],
    amount: ["", Validators.required],
    reason: ["", Validators.required],
    transactionTable: [""]
  })


  #sumTransactions(transactions: Array<ExpenseFormValue>, transactionType: ExpenseFormValue["type"]) {
    return transactions
      .filter(val => val.type === transactionType)
      .reduce((total, value) => total + Number(value.amount || 0), 0);
  }

  //Expense Percentae
  expensePercentage() {
    if (this.incomeAmount && this.expenseAmount) {
      return ((this.expenseAmount - this.incomeAmount) / this.incomeAmount) * 100;
    }
    return undefined;
  }

  //Total Savings
  totalSavingsPercentage() {
    return ((this.incomeAmount - this.expenseAmount) / 100) * 100;
  }


  //Form submit
  expenseFormSubmit() {
    const formValue = this.expenseForm.value as ExpenseFormValue;
    this.expenseForm.reset();

    //Data pushing into Array
    this.incomeExpenseList.push(formValue)
    this.incomeAmount = this.#sumTransactions(this.incomeExpenseList, "income");
    this.expenseAmount = this.#sumTransactions(this.incomeExpenseList, "expense");

    this.totalSavings = this.incomeAmount - this.expenseAmount;
  }

}
