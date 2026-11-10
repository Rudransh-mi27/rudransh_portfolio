export const waveVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;

  varying vec3 vPosition;
  varying float vElevation;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Subtle sinusoidal wave propagation
    float elevation = sin(modelPosition.x * 0.08 + uTime * 0.6) * 
                      cos(modelPosition.y * 0.08 + uTime * 0.5) * 1.2;
    
    elevation += sin(modelPosition.x * 0.2 - uTime * 0.3) * 0.4;

    // Subtle reactive mouse influence
    float distToMouse = length(modelPosition.xy - uMouse * 10.0);
    float mouseWave = sin(distToMouse * 0.4 - uTime * 1.2) * exp(-distToMouse * 0.15) * 2.0;

    elevation += mouseWave;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    // Size attenuation for particles
    gl_PointSize = (1.8 + elevation * 0.5) * (30.0 / -viewPosition.z);

    vPosition = modelPosition.xyz;
    vElevation = elevation;
  }
`;

export const waveFragmentShader = `
  uniform vec3 uColor;
  varying vec3 vPosition;
  varying float vElevation;

  void main() {
    // Render circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) {
      discard;
    }

    // Soft feathered edges
    float alpha = smoothstep(0.5, 0.1, dist) * (0.18 + vElevation * 0.08);

    gl_FragColor = vec4(uColor, clamp(alpha, 0.03, 0.35));
  }
`;
