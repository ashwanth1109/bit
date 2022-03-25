import React, { useMemo, ComponentType } from 'react';
import { LaneDetails, useLanesContext, useLaneComponentsQuery, LaneModel } from '@teambit/lanes.ui.lanes';
import { ComponentGrid } from '@teambit/explorer.ui.gallery.component-grid';
import { RouteSlot, SlotSubRouter } from '@teambit/ui-foundation.ui.react-router.slot-router';
import { WorkspaceComponentCard } from '@teambit/workspace.ui.workspace-component-card';
import flatten from 'lodash.flatten';
import { SlotRegistry } from '@teambit/harmony';
import { EmptyLane } from './empty-lane-overview';

import styles from './lanes-overview.module.scss';

export type LaneOverviewLine = ComponentType;
export type LaneOverviewLineSlot = SlotRegistry<LaneOverviewLine[]>;

export type LanesOverviewProps = {
  routeSlot: RouteSlot;
  overviewSlot?: LaneOverviewLineSlot;
  host: string;
};
export function LanesOverview({ routeSlot, overviewSlot, host }: LanesOverviewProps) {
  const lanesContext = useLanesContext();
  const overviewItems = useMemo(() => flatten(overviewSlot?.values()), [overviewSlot]);

  const currentLane = lanesContext?.currentLane;

  if (!currentLane || !currentLane.id) return null;
  if (currentLane.components.length === 0) return <EmptyLane name={currentLane.name} />;

  return (
    <LaneOverviewWithPreview
      currentLane={currentLane}
      host={host}
      overviewItems={overviewItems}
      routeSlot={routeSlot}
    />
  );
}

type LaneOverviewWithPreviewProps = {
  host: string;
  currentLane: LaneModel;
  overviewItems: LaneOverviewLine[];
  routeSlot: RouteSlot;
};

function LaneOverviewWithPreview({ host, currentLane, overviewItems, routeSlot }: LaneOverviewWithPreviewProps) {
  const { loading, components } = useLaneComponentsQuery(currentLane, host);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <LaneDetails
        laneName={currentLane.id}
        description={''}
        componentCount={currentLane.components.length}
      ></LaneDetails>
      <ComponentGrid>
        {components?.map((component, index) => {
          return <WorkspaceComponentCard key={index} component={component.model} componentUrl={component.url} />;
        })}
      </ComponentGrid>
      {routeSlot && <SlotSubRouter slot={routeSlot} />}
      {overviewItems.length > 0 && overviewItems.map((Item, index) => <Item key={index} />)}
    </div>
  );
}
