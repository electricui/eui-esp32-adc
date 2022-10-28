import {
  ChartContainer,
  LineChart,
  RealTimeDomain,
  TimeAxis,
  VerticalAxis,
} from '@electricui/components-desktop-charts'

import { Card } from '@blueprintjs/core'
import { Composition } from 'atomic-layout'
import { IntervalRequester } from '@electricui/components-core'
import { MessageDataSource } from '@electricui/core-timeseries'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Switch } from '@electricui/components-desktop-blueprint'
import { Printer } from '@electricui/components-desktop'
import { PolledCSVLogger } from '@electricui/components-desktop-blueprint-loggers'

const layoutDescription = `
  Chart Chart
  Control Logging
`

const adcAsource = new MessageDataSource('adcA')
const adcBsource = new MessageDataSource('adcB')

const inAsource = new MessageDataSource('inA')
const inBsource = new MessageDataSource('inB')
const outputDS = new MessageDataSource('out')

export const OverviewPage = (props: RouteComponentProps) => {
  return (
    <React.Fragment>
      <IntervalRequester interval={50} variables={['adcA', 'inA', 'inB']} />

      <Composition areas={layoutDescription} gap={10} autoCols="1fr">
        {Areas => (
          <React.Fragment>
            <Areas.Chart>
              <Card>
                <div style={{ textAlign: 'center', marginBottom: '1em' }}>
                  <b>Analog Inputs</b>
                </div>
                <ChartContainer>
                  <LineChart dataSource={adcAsource} />
                  <LineChart dataSource={adcBsource} />

                  {/* Display 10 seconds of data */}
                  <RealTimeDomain window={10000} />

                  <TimeAxis />
                  <VerticalAxis />
                </ChartContainer>
              </Card>
            </Areas.Chart>

            <Areas.Control>
              <Card>
                <p>Toggle the switch to control the pin #13.</p>
                <Switch
                  unchecked={0}
                  checked={1}
                  accessor={state => state.out}
                  writer={(state, value) => {
                    state.out = value
                  }}
                >
                  Output Pin
                </Switch>
                <p>
                  Input A is <Printer accessor="inA" />
                </p>

                <ChartContainer>
                  <LineChart dataSource={inAsource} />

                  {/* Display 10 seconds of data */}
                  <RealTimeDomain window={10000} yMin={0} yMax={1} />
                  <TimeAxis />
                  <VerticalAxis tickCount={2} />
                </ChartContainer>

                <p>
                  Input B is <Printer accessor="inB" />
                </p>
              </Card>
            </Areas.Control>

            <Areas.Logging>
              <Card>
                <PolledCSVLogger
                  interval={20}
                  columns={[
                    { dataSource: adcAsource, column: 'analogA' },
                    { dataSource: adcBsource, column: 'analogB' },
                    { dataSource: inAsource, column: 'digitalA' },
                    { dataSource: inBsource, column: 'digitalB' },
                    { dataSource: outputDS, column: 'output' },
                  ]}
                />
              </Card>
            </Areas.Logging>
          </React.Fragment>
        )}
      </Composition>
    </React.Fragment>
  )
}
