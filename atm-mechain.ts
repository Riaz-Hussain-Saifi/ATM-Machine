import * as readline from "readline";

class ATM {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  checkBalance(): number {
    return this.balance;
  }

  withdraw(amount: number): string {
    if (amount > this.balance) {
      return "Insufficient funds";
    } else {
      this.balance -= amount;
      return `Withdrawn ${amount} successfully`;
    }
  }

  fastCash(): string {
    const amount = 100; // Fast cash amount
    if (amount > this.balance) {
      return "Insufficient funds";
    } else {
      this.balance -= amount;
      return `Fast cash withdrawn: ${amount}`;
    }
  }
}

// Function to take user input
function getUserInput(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Example usage
async function main() {
  const initialBalance = parseFloat(
    await getUserInput("Enter initial balance: ")
  );
  const atm = new ATM(initialBalance);

  console.log("Current Balance:", atm.checkBalance());

  const withdrawAmount = parseFloat(
    await getUserInput("Enter amount to withdraw: ")
  );
  console.log(atm.withdraw(withdrawAmount));

  console.log("Current Balance:", atm.checkBalance());

  const fastCashOption = await getUserInput(
    "Do you want to withdraw fast cash? (yes/no): "
  );
  if (fastCashOption.toLowerCase() === "yes") {
    console.log(atm.fastCash());
  }

  console.log("Final Balance:", atm.checkBalance());
}

main();
