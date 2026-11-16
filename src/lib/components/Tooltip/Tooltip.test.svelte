<script lang="ts">
import { Button } from '../Button';
import Tooltip from './Tooltip.svelte';
import type { TooltipProps } from './types';
import '../../theme.css';

let {
  placement = 'right-start',
  content = 'Tooltip details',
  open,
  nearRightEdge = false,
}: Pick<TooltipProps, 'placement' | 'open'> & {
  content?: string;
  nearRightEdge?: boolean;
} = $props();
</script>

<div
  style:position="fixed"
  style:top="50%"
  style:left={nearRightEdge ? undefined : '50%'}
  style:right={nearRightEdge ? '4px' : undefined}
  style:transform={nearRightEdge ? 'translateY(-50%)' : 'translate(-50%, -50%)'}
>
  <Tooltip
    {content}
    {placement}
    {open}
    delayDuration={0}
    contentClass="consumer-tooltip"
    arrowClass="consumer-arrow"
    arrow
  >
    <Button variant="outline">Hover target</Button>
  </Tooltip>
</div>
<button type="button" style="position: fixed; top: 0; left: 0;">Outside</button>
