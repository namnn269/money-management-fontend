import {
  Card,
  Text,
  Spacer,
  Radio,
  Table,
  Pagination,
  Badge,
  Row,
  Col,
  Tooltip,
  Modal,
  Popover,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from '~/api/categoryApi';

import DeleteIcon from '~/components/Icons/DeleteIcon';
import EditIcon from '~/components/Icons/EditIcon';
import IconButton from '~/components/Icons/IconButton';
import MyPopover from '~/components/MyPopover';
import { Box } from '~/features/Navbar/Box';
import FormAddNewCategory from '../FormAddNewCategory';

const columns = [
  { key: 'name', label: 'NAME' },
  { key: 'status', label: 'STATUS' },
  { key: 'color', label: 'COLOR' },
  { key: 'action', label: 'ACTION' },
];

/////////////////////////////////////////////////////////////
function TableCategories() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const categoryStore = useSelector((state) => state.categories);
  const [categoryStatusId, setCategoryStatusId] = useState(1);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [showEditCategoryView, setShowEditCategoryView] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 5;

  const getCategoriesByStatus = () => {
    return categoryStore.list.filter((category) =>
      categoryStatusId === 1
        ? category.categoryStatusId === 1
        : category.categoryStatusId === 2
    );
  };

  const deleteCategory = (id) => {
    categoryApi.deleteCategory(id, user, dispatch);
  };

  const getCategoriesByPage = () => {
    return getCategoriesByStatus().slice(
      (pageNo - 1) * pageSize,
      pageNo * pageSize
    );
  };

  const totalCategoriesByStatus = getCategoriesByStatus();
  const categoriesByPage = getCategoriesByPage();

  useEffect(() => {
    categoryApi.getAllCategroies(user, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const renderCell = (category, columnKey) => {
    switch (columnKey) {
      case 'name':
        return category.name;
      case 'color':
        return (
          <p
            style={{
              backgroundColor: category.color,
              width: '1.4rem',
              height: '1.4rem',
            }}
          ></p>
        );
      case 'status':
        return (
          <Badge color={category.categoryStatusId === 1 ? 'success' : 'error'}>
            {category.categoryStatusId === 1 ? 'income' : 'expense'}
          </Badge>
        );
      case 'action':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex', justifyContent: 'center' }}>
              <Tooltip content={`Edit category ${category.id}`}>
                <IconButton
                  onClick={() => {
                    setUpdateCategoryId(category.id);
                    setShowEditCategoryView(true);
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex', justifyContent: 'start' }}>
              <Popover placement="bottom-right">
                <Popover.Trigger>
                  <IconButton>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content>
                  <MyPopover
                    deleteFc={() => {
                      deleteCategory(category.id);
                      setShowMessage(true);
                    }}
                    confirmMsg="Deleting this category will delete all related transactions.
                       Are you sure you want to delete?"
                  />
                </Popover.Content>
              </Popover>
            </Col>
          </Row>
        );
      default:
        break;
    }
  };

  return (
    <Box onClick={() => setShowMessage(false)}>
      <Text
        h1
        size={20}
        align="center"
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          fontWeight: 'bold',
        }}
      >
        YOUR CATEGORIES
      </Text>
      <Spacer />
      <Radio.Group
        aria-label="radio"
        css={{ flexDirection: 'column' }}
        onChange={(e) => setCategoryStatusId(e)}
      >
        <Card
          variant="flat"
          css={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
          }}
        >
          <Card
            css={{
              width: '50%',
              height: '40px',
              justifyContent: 'center',
              alignItems: 'center',
              shadow: 'none',
            }}
            variant="bordered"
          >
            <Radio
              css={{
                padding: '100% 100%',
                fontWeight: '500',
                backgroundColor: categoryStatusId === 1 ? '#17C964' : '',
              }}
              labelColor={categoryStatusId === 1 ? 'warning' : 'success'}
              size="lg"
              color="success"
              value={1}
              isSquared
              aria-label="l1"
            >
              Income
            </Radio>
          </Card>
          <Card
            variant="bordered"
            css={{
              width: '50%',
              height: '40px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Radio
              css={{
                padding: '100% 100%',
                fontWeight: '500',
                backgroundColor: categoryStatusId === 2 ? '#f31260' : '',
              }}
              color="error"
              labelColor={categoryStatusId === 2 ? 'warning' : 'error'}
              size="lg"
              aria-label="l2"
              value={2}
              isSquared
            >
              Expense
            </Radio>
          </Card>
        </Card>
      </Radio.Group>

      <Spacer />
      <Text color="error">{showMessage && categoryStore.delete.message}</Text>
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
        <Table.Body items={categoriesByPage}>
          {(category) => {
            return (
              <Table.Row key={category.id}>
                {(columnKey) => {
                  return (
                    <Table.Cell>{renderCell(category, columnKey)}</Table.Cell>
                  );
                }}
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showEditCategoryView}
        onClose={() => {
          setShowEditCategoryView(false);
          setRerender(!rerender);
        }}
      >
        <Modal.Body>
          <FormAddNewCategory
            updateCategory={categoryStore.list.find(
              (category) => category.id === updateCategoryId
            )}
          />
        </Modal.Body>
      </Modal>
      <Box css={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          size="md"
          total={Math.ceil(totalCategoriesByStatus.length / pageSize)}
          initialPage={pageNo}
          onChange={(e) => setPageNo(e)}
        />
      </Box>
    </Box>
  );
}

export default TableCategories;
