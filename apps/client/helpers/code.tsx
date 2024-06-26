import { dayjs, type Column } from "element-plus";
import { Fragment } from "vue/jsx-runtime";

export const generateCodeColumns = (): Column[] => {
  const { showSource } = useSource();

  return [
    {
      dataKey: "url",
      title: "URL",
      width: 200,
      align: "center",
    },
    {
      dataKey: "fileName",
      title: "文件",
      width: 200,
      align: "center",
    },
    {
      dataKey: "message",
      title: "信息",
      width: 200,
      align: "center",
    },
    {
      dataKey: "time",
      title: "时间",
      width: 200,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <span>{dayjs(rowData.time).format("YYYY-MM-DDTHH:mm:ss")}</span>
      ),
    },
    {
      dataKey: "lineNumber",
      title: "行",
      width: 200,
      align: "center",
    },
    {
      dataKey: "action",
      title: "操作",
      width: 200,
      align: "center",
      cellRenderer: ({ rowData }) => (
        <Fragment>
          <el-button type="primary" onClick={() => showSource(rowData)}>
            源码
          </el-button>
        </Fragment>
      ),
    },
  ];
};
