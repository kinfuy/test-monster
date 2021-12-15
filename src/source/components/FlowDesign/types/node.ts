/** 基础节点 */
interface IFlowNode {
  key: string;
  x: number;
  y: number;
}
/** 事件节点 */
interface IEventNode extends IFlowNode {}
/** 开始节点 */
interface IStartNode extends IFlowNode {}
/** 结束节点 */
interface IEndNode extends IFlowNode {}
/** 逻辑节点 */
interface ILogicNode extends IFlowNode {}
