import { Col, Popover, Row, Table, Tooltip } from '@nextui-org/react';
import moment from 'moment';
import DeleteIcon from '~/components/Icons/DeleteIcon';
import EditIcon from '~/components/Icons/EditIcon';
import ExpenseArrow from '~/components/Icons/ExpenseArrow';
import IconButton from '~/components/Icons/IconButton';
import IncomeArrow from '~/components/Icons/IncomeArrow';
import MyPopover from '~/components/MyPopover';

const columns = [
  { key: 'date', label: 'DATE' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'category', label: 'CATEGORY' },
  { key: 'categoryStatusId', label: 'STATUS' },
  { key: 'action', label: 'ACTION' },
];

const arrowIcons = {
  incomeArrow: <IncomeArrow />,
  expenseArrow: <ExpenseArrow />,
};

const renderCell = (
  item,
  columnKey,
  categoryOfItem,
  setCurrentIdTrans,
  setShowEditTransView,
  deleteTrans
) => {
  let content;
  switch (columnKey) {
    case 'date':
      content = moment(item.date).format('MM/DD/YYYY');
      break;
    case 'amount':
      if (categoryOfItem.categoryStatusId === 1) content = `+${item.amount}`;
      if (categoryOfItem.categoryStatusId === 2) content = `-${item.amount}`;
      break;
    case 'category':
      content = categoryOfItem.name;
      break;
    case 'categoryStatusId':
      if (categoryOfItem.categoryStatusId === 2)
        content = arrowIcons.expenseArrow;
      if (categoryOfItem.categoryStatusId === 1)
        content = arrowIcons.incomeArrow;
      break;
    case 'action':
      content = (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Edit transaction">
              <IconButton
                onClick={() => {
                  setCurrentIdTrans(item.id);
                  setShowEditTransView(true);
                }}
              >
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Popover placement="bottom-right">
              <Popover.Trigger>
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content>
                <MyPopover
                  deleteFc={() => deleteTrans(item.id)}
                  confirmMsg="Are you sure you want to delete?"
                />
              </Popover.Content>
            </Popover>
          </Col>
        </Row>
      );
      break;
    default:
      break;
  }
  return content;
};

/////////////////////////////////////////////////////////////////
function RenderTransTable({
  listItems,
  categorySource,
  setCurrentIdTrans,
  setShowEditTransView,
  deleteTrans,
}) {
  listItems = listItems.map((trans) => {
    return {
      id: trans.id,
      amount: trans.amount,
      date: trans.date,
      categoryId: trans.categoryId,
    };
  });
  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            align={column.key === 'action' ? 'center' : 'start'}
            key={column.key}
          >
            {column.label}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={listItems}>
        {(item) => {
          const categoryOfItem = categorySource.find(
            (c) => c.id === item.categoryId
          );
          return (
            <Table.Row key={item.id}>
              {(columnKey) => {
                let color = 'red';
                if (categoryOfItem.categoryStatusId === 1) color = 'green';
                else if (categoryOfItem.categoryStatusId === 2) color = 'red';
                return (
                  <Table.Cell css={{ color: color, fontWeight: 600 }}>
                    {renderCell(
                      item,
                      columnKey,
                      categoryOfItem,
                      setCurrentIdTrans,
                      setShowEditTransView,
                      deleteTrans
                    )}
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

export default RenderTransTable;
