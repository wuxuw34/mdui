import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import type { MShapeProps, MShapeRef, MShapeType } from "./interface";
import "./shape.scss";
import { shape_paths } from "./shapes";
import { interpolate } from "flubber";

function centerPathInSvg(svgSelector, pathSelector) {
  const svg = document.querySelector(svgSelector);
  const path = document.querySelector(pathSelector);

  if (!svg || !path) return;

  // 获取 path 的边界框
  const bbox = path.getBBox();

  // 获取 viewBox 尺寸
  const vb = svg.viewBox.baseVal;
  const svgCenterX = vb.width / 2;
  const svgCenterY = vb.height / 2;

  // 计算 path 中心
  const pathCenterX = bbox.x + bbox.width / 2;
  const pathCenterY = bbox.y + bbox.height / 2;

  // 计算需要平移的距离
  const dx = svgCenterX - pathCenterX;
  const dy = svgCenterY - pathCenterY;

  // 应用平移
  path.setAttribute("transform", `translate(${dx}, ${dy})`);
}

/**
 * 形状组件
 * @description md3 官网的形状实现
 * @param shape 形状
 */
const MShape = forwardRef<MShapeRef, MShapeProps>(
  ({ shape = "circle", size = 100, style, ...rest }, ref) => {
    const id = useId();
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const tempShape = useRef<MShapeType>(shape);
    const interpolatorRef = useRef<((t: number) => string) | null>(null);

    const centerPath = () => {
      const svg = svgRef.current;
      const path = pathRef.current;
      if (!svg || !path) return;

      // 获取 path 的边界框
      const bbox = path.getBBox();

      // 获取 viewBox 尺寸
      const vb = svg.viewBox.baseVal;
      const svgCenterX = vb.width / 2;
      const svgCenterY = vb.height / 2;

      // 计算 path 中心
      const pathCenterX = bbox.x + bbox.width / 2;
      const pathCenterY = bbox.y + bbox.height / 2;

      // 计算需要平移的距离
      const dx = svgCenterX - pathCenterX;
      const dy = svgCenterY - pathCenterY;

      // 应用平移
      path.setAttribute("transform", `translate(${dx}, ${dy})`);
    };

    const draw = (interpolator: (t: number) => string, t: number) => {
      pathRef.current?.setAttribute("d", interpolator(t));
      if (t < 1) {
        requestAnimationFrame(() => draw(interpolator, t + 0.03));
      } else {
        interpolatorRef.current = null;
      }
      centerPath();
    };

    const changeShape = (to: MShapeType) => {
      if (interpolatorRef.current) {
        draw(interpolatorRef.current, 1);
      }
      const normalizePathForFlubber = (shape: MShapeType) => {
        const samples = 50;
        const pathString = shape_paths[shape];
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path.setAttribute("d", pathString);
        const length = path.getTotalLength();
        const points = [];

        for (let i = 0; i <= samples; i++) {
          const { x, y } = path.getPointAtLength((i / samples) * length);
          points.push([x, y]);
        }
        return points;
      };
      interpolatorRef.current = interpolate(
        normalizePathForFlubber(tempShape.current),
        normalizePathForFlubber(to),
      );

      tempShape.current = to;
      draw(interpolatorRef.current!, 0);
    };

    useImperativeHandle(ref, () => ({
      changeShape,
    }));

    useEffect(() => {
      centerPath();
    }, []);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          ...style,
        }}
        className="mdui-shape"
        {...rest}
        ref={svgRef}
        viewBox="0 0 340 340"
      >
        <g>
          <path
            ref={pathRef}
            transform-origin="center"
            d={shape_paths[shape]}
            fill="currentColor"
            id={id}
          />
        </g>
      </svg>
    );
  },
);
export default MShape;
