import React, { useEffect, useState } from 'react';
import AccessTime from '@material-ui/icons/AccessTime';
import take from 'lodash/take';
import { closestIndexTo, isAfter, compareAsc } from 'date-fns';
import { css } from '@emotion/core';
import spacing from '../util/spacing';
import colors from '../util/colors';
import HeaderTwoWithIcon from './HeaderTwoWithIcon';
import Slots from './Slot/Slots';
import { eventData } from '../json';
import { FetchSlots } from '../graphql/airtable';

const NextUp = () => {
  const today = new Date();
  const [slots, setSlots] = useState([]);
  const newSlots = FetchSlots();
  useEffect(() => {
    setSlots(newSlots);
  }, []);
  const nextUpDates = slots
    .map(slot => {
      const startContainsDot = slot.start.includes('.');
      const splittedStart = slot.start.split('.');
      const hour = splittedStart[0];
      const minute = splittedStart[1];

      return {
        ...slot,
        timestamp: new Date(
          eventData.year,
          eventData.monthNumber - 1, //0 indexed....
          slot.date,
          hour,
          minute,
        ),
      };
    })
    .filter(slot => {
      return !isAfter(today, slot.timestamp);
    })
    .sort((a, b) => compareAsc(a.timestamp, b.timestamp));

  let indexClosest = closestIndexTo(today, nextUpDates);

  const fourNextUp =
    nextUpDates.length !== 0 ? take(nextUpDates.slice(indexClosest), 4) : [];

  return (
    <div>
      <HeaderTwoWithIcon>
        <AccessTime
          css={css`
            margin-right: ${spacing.small};
            color: ${colors.blue};
          `}
        />
        Det neste som skjer
      </HeaderTwoWithIcon>
      {fourNextUp.length !== 0 ? (
        <Slots noGroupBy slots={fourNextUp} />
      ) : (
        <div>
          <p>Virker som det er over gitt :/</p>
        </div>
      )}
    </div>
  );
};

export default NextUp;
