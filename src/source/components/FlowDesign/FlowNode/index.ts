/** 基础节点 */
interface FlowNode {
  key: string;
  icon: string;
}
/** 事件节点 */
interface EventNode extends FlowNode {}
/** 开始节点 */
interface StartNode extends FlowNode {}
/** 结束节点 */
interface EndNode extends FlowNode {}
/** 逻辑节点 */
interface LogicNode extends FlowNode {}
