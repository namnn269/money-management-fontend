import { Table } from '@nextui-org/react';

import IncomeArrow from '~/components/Icons/IncomeArrow';
import ExpenseArrow from '~/components/Icons/ExpenseArrow';

export default function RecentTransactions({ listItems, categorySource }) {
  const arrowIcons = {
    incomeArrow: <IncomeArrow />,
    expenseArrow: <ExpenseArrow />,
  };

  const columns = [
    {
      key: 'date',
      label: 'DATE',
    },
    {
      key: 'amount',
      label: 'AMOUNT',
    },
    {
      key: 'category',
      label: 'CATEGORY',
    },
    {
      key: 'status',
      label: 'STATUS',
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: 'auto',
        minWidth: '100%',
        alignSelf: 'center',
      }}
    >
      <Table.Header columns={columns}>
        {(col) => <Table.Column key={col.key}>{col.label}</Table.Column>}
      </Table.Header>
      <Table.Body items={listItems}>
        {(item) => {
          return (
            <Table.Row key={item.id}>
              {(columnKey) => {
                let content;
                const categoryOfItem = categorySource.find(
                  (category) => category.id === item.categoryId
                );
                const categoryStatusId = categoryOfItem.categoryStatusId;
                switch (columnKey) {
                  case 'date':
                    content = item.date;
                    break;
                  case 'amount':
                    content = `${categoryStatusId === 1 ? '+' : '-'}${
                      item.amount
                    }`;
                    break;
                  case 'category':
                    content = categoryOfItem.name;
                    break;
                  case 'status':
                    content =
                      categoryStatusId === 1
                        ? arrowIcons.incomeArrow
                        : arrowIcons.expenseArrow;
                    break;
                  default:
                    break;
                }

                return (
                  <Table.Cell
                    css={{
                      color: categoryStatusId === 1 ? 'green' : 'red',
                      fontWeight: 600,
                    }}
                  >
                    {content}
                  </Table.Cell>
                );
              }}
            </Table.Row>
          );
        }}
      </Table.Body>
    </Table>
  );
}
