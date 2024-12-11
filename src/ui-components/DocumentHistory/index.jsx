import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export const DocumentHistory = ({docHistory}) => {
  const applicationHistory = docHistory[0];
  const extractDate = (date) => {
    return new Date(date.split('T')[0]).toDateString();
  }
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {extractDate(applicationHistory?.submittedOn)}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Submitted</TimelineContent>
      </TimelineItem>
      {
        (applicationHistory?.reviewedOn) ? (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {extractDate(applicationHistory?.reviewedOn)}
          </TimelineOppositeContent>
          <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Reviewed</TimelineContent>
        </TimelineItem>
        ) : ''
      }
      {
        (applicationHistory?.declinedOn) ? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {extractDate(applicationHistory?.declinedOn)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Declined</TimelineContent>
          </TimelineItem>
        ) : ''
      }
      {
        (applicationHistory?.approvedOn) ? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {extractDate(applicationHistory?.approvedOn)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Approved</TimelineContent>
          </TimelineItem>
        ) : ''
      }
      {
        (applicationHistory?.issuedOn) ? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {extractDate(applicationHistory?.issuedOn)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Issued</TimelineContent>
          </TimelineItem>
        ) : ''
      }
      {
        (applicationHistory?.expiresOn) ? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {extractDate(applicationHistory?.expiresOn)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Expired</TimelineContent>
          </TimelineItem>
        ) : ''
      }
    </Timeline>
  );
}