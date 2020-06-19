/** @jsx jsx */
import React, { FC, FormEvent } from 'react';
import { jsx, css } from '@emotion/core';
import { Input, Button, Dropdown, DropdownProps, InputOnChangeData } from 'semantic-ui-react';

const margin = css`
  margin: 0.5rem;
`;

interface AddExpenseFormProps {
  handleChangeAmount?: (e: FormEvent, { value }: InputOnChangeData) => void;
  handleChangeDate?: (e: FormEvent, { value }: DropdownProps) => void;
  handleClick?: () => void;
  amount?: string;
  dateOptions?: { text: string; value: number }[];
}

export const AddExpenseFormComponent: FC<AddExpenseFormProps> = ({
  handleClick = () => {},
  handleChangeAmount = () => {},
  handleChangeDate = () => {},
  amount = '',
  dateOptions = [{ text: 'Date', value: 0 }],
}) => {
  return (
    <div css={margin}>
      <Input
        // icon="yen"
        // iconPosition="left"
        action
        onChange={handleChangeAmount}
        placeholder="Expense"
        value={amount}
      >
        <input />
        <Dropdown
          css={css`
            min-width: 9rem !important;
          `}
          compact
          placeholder="Date"
          selection
          options={dateOptions}
          onChange={handleChangeDate}
        />
        <Button
          negative
          onClick={handleClick}
          content="Submit"
          disabled={!(/\d+/giu.test(amount) && !/[a-z]+/giu.test(amount))}
          attached="right"
        />
      </Input>
      <Dropdown options={dateOptions} defaltValue={dateOptions[0].value} />
    </div>
  );
};
