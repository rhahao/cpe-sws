import { Box, Stack } from '@mui/material';
import { useAppTranslation } from '@hooks/index';
import { TextFieldStyles } from './index.styles';
import { WeekBoxProps } from './index.types';
import useWeekBox from './useWeekBox';
import NowIndicator from './now_indicator';
import TextField from '@components/textfield';
import Typography from '@components/typography';

const WeekBox = (props: WeekBoxProps) => {
  const { t } = useAppTranslation();

  const {
    isCurrent,
    recordOnline,
    handlePresentChange,
    handlePresentSave,
    present,
    online,
    handleOnlineChange,
    handleOnlineSave,
    total,
    isMidweek,
    isWeekend,
  } = useWeekBox(props);

  return (
    <Stack spacing="4px" flex={1}>
      <Stack spacing="16px">
        {recordOnline && (
          <Box
            sx={{
              padding: '4px 16px',
              backgroundColor: 'var(--accent-150)',
              borderRadius: 'var(--radius-m)',
            }}
          >
            <Typography
              className="body-small-semibold"
              color={`var(--${props.type}-meeting)`}
            >
              {t('tr_weekNumber', { weekNumber: props.index })}
            </Typography>
          </Box>
        )}

        <TextField
          type="number"
          label={
            recordOnline
              ? t('tr_present')
              : t('tr_weekNumber', { weekNumber: props.index })
          }
          value={present}
          onChange={(e) => handlePresentChange(e.target.value)}
          onKeyUp={handlePresentSave}
          inputProps={{ className: 'h4' }}
          sx={TextFieldStyles}
        />

        {recordOnline && (
          <Stack
            spacing="4px"
            height={
              (props.type === 'midweek' && isMidweek) ||
              (props.type === 'weekend' && isWeekend)
                ? '56px'
                : 'unset'
            }
          >
            <TextField
              type="number"
              label={t('tr_online')}
              value={online}
              onChange={(e) => handleOnlineChange(e.target.value)}
              onKeyUp={handleOnlineSave}
              inputProps={{ className: 'h4' }}
              sx={TextFieldStyles}
            />
            {isCurrent && <NowIndicator type={props.type} />}
          </Stack>
        )}

        {recordOnline && (
          <Box
            sx={{
              padding: '4px 16px',
              backgroundColor: 'var(--accent-100)',
              borderRadius: 'var(--radius-m)',
            }}
          >
            <Typography
              className="h4"
              textAlign="center"
              color={`var(--accent-dark)`}
            >
              {total}
            </Typography>
          </Box>
        )}
      </Stack>

      {!recordOnline && isCurrent && <NowIndicator type={props.type} />}
    </Stack>
  );
};

export default WeekBox;
