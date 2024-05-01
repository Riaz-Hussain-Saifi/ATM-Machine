#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Define PIN code and initial balance
const pinCode: number = 2001;
let myBalance: number = 35000;
let attemptsLeft: number = 3;

// Fast cash amounts
const fastCashOptions: number[] = [500, 1000, 3000, 5000, 10000];

// Function to check PIN validity
async function checkPIN() {
  if (attemptsLeft === 0) {
    console.log(chalk.red("\nMaximum attempts reached. Exiting..."));
    return;
  }

  const pin = await inquirer.prompt([
    {
      type: "password",
      name: "pincode",
      message: "Enter your PIN: ",
      mask: "*", // Mask input for security
    },
  ]);

  // Check if PIN is correct
  const isValidPin = parseInt(pin.pincode) === pinCode;

  if (isValidPin) {
    console.log(chalk.green("\n Welcome!"));
    console.log(chalk.green("\t Your balance is: " + myBalance));
    // Call ATM options
    ATMOptions();
  } else {
    attemptsLeft--;
    console.log(chalk.red("\n Invalid PIN!"));
    console.log(chalk.redBright(`\t Try again! You have ${attemptsLeft} attempts left`));
    await checkPIN();
  }
}

// Function to display ATM options
async function ATMOptions() {
  const options = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose an option: ",
      choices: ["Check Balance", "Withdraw", "Fast Cash", "Exit"],
    },
  ]);

  switch (options.option) {
    case "Check Balance":
      console.log(chalk.greenBright("\n Your balance is: " + myBalance));
      ATMOptions();
      break;
    case "Withdraw":
      withdrawAmount();
      break;
    case "Fast Cash":
      selectFastCashAmount();
      break;
    case "Exit":
      console.log(chalk.yellow("\n Thank you for using our ATM. Goodbye!"));
      break;
  }
}

// Function to select fast cash amount
async function selectFastCashAmount() {
  const amountSelection = await inquirer.prompt([
    {
      type: "list",
      name: "amount",
      message: "Select fast cash amount: ",
      choices: fastCashOptions.map((amount) => `${amount}`),
    },
  ]);

  const selectedAmount = parseInt(amountSelection.amount);
  withdraw(selectedAmount);
}

// Function to handle withdrawal
async function withdraw(amount: number) {
  if (amount <= myBalance) {
    myBalance -= amount;
    console.log(chalk.green(`\n Withdrawn ${amount} successfully`));
    console.log(chalk.green("\t Your updated balance is: " + myBalance));
    ATMOptions();
  } else {
    console.log(chalk.red("\n Insufficient funds!"));
    ATMOptions();
  }
}

// Function to handle withdrawal
async function withdrawAmount() {
  const withdrawal = await inquirer.prompt([
    {
      type: "input",
      name: "amount",
      message: "Enter amount to withdraw: ",
    },
  ]);
  const amount = parseFloat(withdrawal.amount);

  // Check if withdrawal amount is valid
  if (!isNaN(amount) && amount > 0 && amount <= myBalance) {
    withdraw(amount);
  } else {
    console.log(chalk.red("\n Invalid amount or insufficient funds!"));
    ATMOptions();
  }
}

// Main function to start ATM interaction
async function main() {
  console.log(chalk.blue.bold("\n Welcome to the CLI_ATM_machine")); 
  console.log(chalk.blue.green("\t Please enter your PIN to continue \n"));
  await checkPIN();
}

// Start ATM interaction
main();
